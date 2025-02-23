
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
  strategy: 'direct-llm' | 'summaries-to-llm',
  created_by: number,
}
