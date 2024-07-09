import { Controller, Body, Post, Req } from '@nestjs/common'
import { FriendService } from './friend.service'
import { HttpCode, USER_INFO } from 'src/enum'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

/**
 * 邮件相关接口列表
 */
@Controller('friend')
@ApiTags('好友')
export class FriendController {
  /**
   * @param friendService 好友服务
   */
  constructor(
    private readonly friendService: FriendService,
  ) { }

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
