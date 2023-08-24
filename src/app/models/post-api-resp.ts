import {IApiResp} from "./iapi-resp";

export interface PostApiResp extends IApiResp{

  _id: string, 				// server generated
  text: string,  		// the only property you need to send
  username: string, 											// server generated
  createdAt: string, 	// server generated
  updatedAt: string, 	// server generated
  __v: number, 																	// server generated
  user: IApiResp;
}

