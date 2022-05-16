import {IPage} from "../types/page";

export const pageData: IPage = {
  title: "UShow Demo",
  theme: "default",
  contents: [
    {
      mainPicSrc: "https://raw.githubusercontent.com/MakinoharaShoko/WebGAL_Demo_Page/main/game/figure/k6.png",
      contents: [
        {
          type: "text",
          bold: true,
          content: "UShow"
        },
        {
          type: "text",
          content: "下一代"
        },
        {
          type: "text",
          color: '#005CAF',
          content: "数据驱动"
        },
        {
          type: "text",
          content: "产品展示框架"
        },
        {
          type: 'button',
          content: '立刻了解',
          href:'https://github.com/MakinoharaShoko/UShow'
        },
      ]
    },
    {
      mainPicSrc: "https://raw.githubusercontent.com/MakinoharaShoko/WebGAL_Demo_Page/main/game/figure/k6.png",
      contents: [
        {
          type: "text",
          content: "Hello,UShow2!"
        }
      ]
    }
  ]
}
