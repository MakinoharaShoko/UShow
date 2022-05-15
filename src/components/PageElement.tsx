import {IContent} from "../types/element";
import {ReactElement} from "react";
import styles from './pageElement.module.scss'

interface IProps {
  content: IContent | null;
}

export function PageElement(props: IProps) {
  let returnElement = <div style={{display: "none"}}/>
  if (props) {
    const contents: Array<ReactElement> = [];
    props.content?.contents.map((e, i) => {
      const thisElement = <div key={'pageContent' + i}>{e.content}</div>;
      contents.push(thisElement)
    })
    returnElement = <div className={styles.page}>
      <div className={styles.picContainer} style={{backgroundImage: `url(${props.content?.mainPicSrc})`}}/>
      <div className={styles.contentContainer}>
        <div className={styles.contentInnerContainer}>
          {contents}
        </div>
      </div>
    </div>
  }
  return returnElement;
}
