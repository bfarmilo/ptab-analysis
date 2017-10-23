export type resultSet = {
  _id: string,
  IPR: string,
  DateFiled: string,
  Status: string,
  FWDStatus: string,
  Petitioner: Array<{name:string, type:string}>
  PatentOwner: Array<{name:string, type:string}>,
  Patent: number,
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
  count: number
}

export type details = {
  PatentClaim: string,
  ID: string
}