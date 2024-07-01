import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseInterceptors,
  UploadedFile,
  Req
} from '@nestjs/common'
import { EmailService } from '../email'
import { UserService } from './user.service'
import { HttpCode, USER_INFO } from 'src/enum'
import { getDate, Result, SensitiveWord } from 'src/utils'
import * as fs from 'fs'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { LoginEmailDTO, GetUserInfoDTO, SetUserInfoDTO } from './dto'

/**
 * 用户相关模块
 */
@Controller('user')
@ApiTags('用户')
export class UserController {
  /**
   * @param userService 用户服务
   * @param emailService 邮箱服务
   */
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}

  @ApiOperation({ summary: '邮箱验证码登录' })
  @ApiResponse({ status: HttpCode.OK, description: '登录成功' })
  @ApiParam({ name: 'email', description: '邮箱', required: true })
  @ApiParam({ name: 'code', description: '验证码', required: true })
  /**
   * 邮箱验证码登录
   *
   * @param body 请求体
   * @param body.email 邮箱
   * @param body.code 验证码
   */
  @Post('/login/email')
  async loginEmail(@Body() body: LoginEmailDTO) {
    const { email, code } = body

    /** 检测验证码是否正确 */
    const codeResult = await this.emailService.validatorCode(email, code)

    // 验证码正确
    if (codeResult.code === HttpCode.OK) {
      return await this.userService.loginEmail(body.email)
    }

    // 验证码不正确
    return new Result(HttpCode.ERR, '验证码不正确')
  }

  @ApiOperation({ summary: '获取指定用户信息' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'id', description: '用户 id', required: true })
  /**
   * 获取指定用户信息
   *
   * @param info 用户信息
   * @param info.user_id 用户 id
   */
  @Get('/info')
  getUserInfo(@Query() query: GetUserInfoDTO) {
    return this.userService.getUserInfo(query.user_id)
  }

  @ApiOperation({ summary: '设置用户信息' })
  /**
   * 设置用户信息
   *
   * @param body 请求参数
   * @param headers 请求头
   */
  @Post('/set/user_info')
  setUserInfo(@Req() req: Request, @Body() body: SetUserInfoDTO) {
    const { user_id } = req[USER_INFO]

    const sensitiveWord = new SensitiveWord()

    const isHave = sensitiveWord.validater(body.nick_name)

    console.log(body, isHave)

    // if(isHave) {
    //   return new
    // }

    return this.userService.setUserInfo({ ...body, user_id })
  }

  @ApiOperation({ summary: '用户头像上传' })
  @ApiResponse({ status: HttpCode.OK, description: '上传成功' })
  /**
   * 头像上传
   *
   * @param file 文件
   * @param id 用户 id
   */
  @Post('/info/up_avatar')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        /**
         * 定义存储文件的目录
         */
        destination: (req, file, callback) => {
          /** 需要上传的文件目录 */
          const uploadPath = './uploads/avatar/' + getDate()

          // 检查目录是否存在，如果不存在则创建它
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true })
          }

          callback(null, uploadPath)
        },
        /**
         * 定义生成文件名的方式
         *
         * @param req HTTP 请求对象，包含了请求头、请求体、请求参数等信息
         * @param file 上传的文件对象，包含了文件的相关属性，例如文件名、文件大小、文件类型等
         * @param callback 回调函数，用于告诉 Multer 文件存储的位置和文件名
         */
        filename: (req, file, callback): void => {
          const ext =
            {
              'image/jpeg': '.jpg',
              'image/png': '.png',
              'image/gif': '.gif'
            }[file.mimetype] || '.jpg'

          /** 生成文件名 */
          const uniqueSuffix: string =
            Date.now() + '-' + Math.round(Math.random() * 1e9) + ext

          callback(null, uniqueSuffix)
        }
      })
    })
  )
  async setAvatar(@Req() req: Request, @UploadedFile() file) {
    const { user_id } = req[USER_INFO]

    const avatar = `/uploads/avatar/${getDate()}/${file.filename}`

    return this.userService.setAvatar(user_id, avatar)
  }

  @ApiOperation({ summary: '获取用户的动态发布日历热力图' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'year', description: '年份', required: true })
  @ApiParam({ name: 'id', description: '用户 id', required: false })
  /**
   * 获取用户的动态发布日历热力图
   *
   * @param query 参数
   * @param query.year 年份
   */
  @Get('/get_calendar_heatmap')
  getCalendarHeatmap(
    @Req() req: Request,
    @Query() query: { year: number; user_id?: string }
  ) {
    const { user_id } = req[USER_INFO]

    // 默认为今年
    if (!query.year) {
      const date = new Date()
      query.year = date.getFullYear()
    }

    return this.userService.getCalendarHeatmap(
      query.user_id || user_id,
      query.year
    )
  }
}
