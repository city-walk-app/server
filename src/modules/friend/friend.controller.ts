import { Controller, Body, Post, Req } from '@nestjs/common'
import { FriendService } from './friend.service'
import { HttpCode, USER_INFO } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'

/**
 * 邮件相关接口列表
 */
@Controller('friend')
@ApiTags('好友')
export class FriendController {
  /**
   * @param friendService 好友服务
   */
  constructor(private readonly friendService: FriendService) { }

  @ApiOperation({ summary: '邀请朋友' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  /**
   * 邀请朋友
   *
   * @param req 请求
   */
  @Post('/invite')
  friendInvite(@Req() req: Request) {
    const { user_id } = req[USER_INFO]

    return this.friendService.friendInvite(user_id)
  }

  @ApiOperation({ summary: '获取邀请详情' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'invite_id', description: '邀请 id', required: true })
  /**
   * 获取邀请详情
   *
   * @param req 请求
   * @param body 请求体
   */
  @Post('/get/invite/info')
  getFriendInviteInfo(
    @Req() req: Request,
    @Body() body: { invite_id: string }
  ) {
    const { user_id } = req[USER_INFO]

    return this.friendService.getFriendInviteInfo(user_id, body.invite_id)
  }

  @ApiOperation({ summary: '拒绝邀请' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'invite_id', description: '邀请 id', required: true })
  /**
   * 拒绝邀请
   *
   * @param req 请求
   * @param body 请求体
   */
  @Post('/refuse/invite')
  refuseInvite(@Body() body: { invite_id: string }) {
    return this.friendService.refuseInvite(body.invite_id)
  }

  @ApiOperation({ summary: '同意邀请' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  @ApiParam({ name: 'invite_id', description: '邀请 id', required: true })
  /**
   * 同意邀请
   *
   * @param req 请求
   * @param body 请求体
   */
  @Post('/confirm/invite')
  confirmInvite(@Req() req: Request, @Body() body: { invite_id: string }) {
    const { user_id } = req[USER_INFO]

    return this.friendService.confirmInvite(user_id, body.invite_id)
  }

  @ApiOperation({ summary: '获取朋友列表' })
  @ApiResponse({ status: HttpCode.OK, description: 'ok' })
  /**
   * 获取朋友列表
   *
   * @param req 请求
   */
  @Post('/list')
  friendList(@Req() req: Request) {
    const { user_id } = req[USER_INFO]

    return this.friendService.friendList(user_id)
  }
}
