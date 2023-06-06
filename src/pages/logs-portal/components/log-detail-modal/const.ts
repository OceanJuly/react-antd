interface Level2Word {
  [key: string]: string
  E: string,
  I: string,
  D: string,
  W: string,
  V: string,
}

interface FilterProps {
  resource: Array<string>;
  logType: Array<string>,
  keyword: string
}

export const level2wrod: Level2Word = {
  E: 'Error',
  I: 'Info',
  D: 'Desc',
  W: 'Warn',
  V: 'Verbose'
}

export const level2color: Level2Word = {
  E: '#b63d3d',
  I: '#827c72',
  D: '#333',
  W: '#b68b3d',
  V: '#333'
}

export const _filterObj: FilterProps = {
  resource: [],
  logType: [],
  keyword: ''
}