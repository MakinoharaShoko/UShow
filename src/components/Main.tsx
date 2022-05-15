import {useEffect, useRef, useState} from "react";
import {pageData} from "../data/data";
import {PageElement} from "./PageElement";
import __ from 'lodash';
import styles from './main.module.scss'
import {IContent} from "../types/element";

export function Main() {
  // 当前页数
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // 当前的页面数据
  const [page, setPage] = useState(pageData);
  const [currentPage, setCurrentPage] = useState(page.contents[currentPageIndex]);
  const [prevPage, setPrevPage] = useState<IContent | null>(null);
  const currentPageIndexRef = useRef(currentPageIndex);

  useEffect(() => {
    document.title = page.title;
    const switchPage = (goDown: boolean) => {
      console.log(currentPageIndex);
      if (goDown && currentPageIndex < page.contents.length - 1) {
        console.log('下一页');
        const prev = __.cloneDeep(currentPage);
        setPrevPage(prev);
        setCurrentPage(page.contents[currentPageIndex + 1]);
        setCurrentPageIndex(currentPageIndex + 1);
      } else if (!goDown && currentPageIndex > 0) {
        console.log('上一页');
        const prev = __.cloneDeep(currentPage);
        setPrevPage(prev);
        setCurrentPage(page.contents[currentPageIndex - 1]);
        setCurrentPageIndex(currentPageIndex - 1);
      }
    };

    function eventHandler(e: WheelEvent) {
      if (e.deltaY > 0) {
        switchPage(true);
      } else {
        switchPage(false);
      }
    }

    const debouncedEventHandler = __.debounce(eventHandler, 500)
    window.addEventListener("wheel", debouncedEventHandler);
    return () => {
      window.removeEventListener("wheel", debouncedEventHandler);
    };
  });
  return <div>
    <div key={currentPageIndex + 'disappear'} className={styles.disappear}>
      <PageElement isDisAppear={true} content={prevPage}/>
    </div>
    <div key={currentPageIndex + 'show'} className={styles.show}>
      <PageElement isDisAppear={false} content={currentPage}/>
    </div>
  </div>
}
