import {IContent} from "./element"

export interface IPage {
  title: string
  theme: string
  contents: Array<IContent>
}
