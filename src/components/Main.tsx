import {useEffect, useState} from "react";
import {PageElement} from "./PageElement";
import __ from 'lodash';
import styles from './main.module.scss'
import {IContent} from "../types/element";
import {IPage} from "../types/page";
import * as Hammer from 'hammerjs';

interface IProps {
  pageData: IPage
}


export function Main(props: IProps) {
  // 当前页数
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  // 当前的页面数据
  const page = props.pageData;
  const [currentPage, setCurrentPage] = useState(page.contents[currentPageIndex]);
  const [prevPage, setPrevPage] = useState<IContent | null>(null);

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
    const debouncedSwitch = __.debounce(switchPage, 500);

    function eventHandler(e: WheelEvent) {
      if (e.deltaY > 0) {
        debouncedSwitch(true);
      } else {
        debouncedSwitch(false);
      }
    }


    window.addEventListener("wheel", eventHandler);
    const appRoot = document.getElementById('showPage');
    let hammer: HammerManager;
    let swiper;
    if (appRoot) {
      hammer = new Hammer.Manager(appRoot);
      swiper = new Hammer.Swipe();
      hammer.add(swiper);
      hammer.on('swipeup', () => {
        debouncedSwitch(true)
      });
      hammer.on('swipedown', () => {
        debouncedSwitch(false)
      });
    }

    return () => {
      window.removeEventListener("wheel", eventHandler);
      if (appRoot) {
        hammer.off('swipedown');
        hammer.off('swipeup');
      }
    };
  });
  return <div>
    <div key={currentPageIndex + 'disappear'} className={styles.disappear}>
      <PageElement isDisAppear={true} content={prevPage}/>
    </div>
    <div id={'showPage'} key={currentPageIndex + 'show'} className={styles.show}>
      <PageElement isDisAppear={false} content={currentPage}/>
    </div>
  </div>
}
