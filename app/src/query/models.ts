
export interface IUser {
  id: number,
  name: string,
  email: string,
}

export interface IPodcast {
  id: number,
  title: string,
  abstract: string,
  doi: string,
  status: 'html-to-chunks' | 'chunks-to-sum' | 'sum-to-trans' | 'trans-to-audio',
  created_by: number,
}
