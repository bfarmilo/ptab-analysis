export type resultSet = {
  _id: string,
  IPR: string,
  DateFiled: string,
  Status: string,
  FWDStatus: string,
  Petitioner: Array<{name:string, type:string}>
  PatentOwner: Array<{name:string, type:string}>,
  Patent: string,
  Claim: number,
  MainUSPC: string,
  Instituted: boolean,
  Invalid: boolean,
  survivalStatus: string,
  claimIdx: string
}

export type survivalStats = {
  type: string,
  score: number,
  data: Array<{bin:string, count: number}>
}

export type details = {
  PatentClaim: string,
  ID: string
}