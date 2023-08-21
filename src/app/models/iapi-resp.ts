export interface IApiResp {
  _id: string, // server generated
  name: string,
  surname: string,
  email: string,
  bio: string,
  title: string,
  area: string,
  image: string, 	// server generated on upload
  username: string // server generated from Auth
  createdAt: string, 	// server generated
  updatedAt: string, 	// server generated
  __v: number 																	// server generated
}
