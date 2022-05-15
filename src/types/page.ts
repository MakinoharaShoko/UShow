import {IContent} from "./element"


type theme = 'default' | 'poetic' | 'fashion' | 'modern' | 'cyberpunk'

export interface IPage {
  title: string
  theme: string
  contents: Array<IContent>
}
