export interface Attendence {
  key?: string,
  courseKey: string,
  usersKeys: userkey[]
}
export interface userkey {
  userKey: string,
  days: dayinfo[]
}
export interface dayinfo {
  date: string,
  usersData: usersdata
}
export interface usersdata {
  attendTime: string,
  leaveTime: string,
  atteendSign: string,
  leaveSign: string,
  attend: boolean
}
