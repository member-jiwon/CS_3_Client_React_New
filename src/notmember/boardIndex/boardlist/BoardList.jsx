import React from "react";
import {
  MoreHorizontal,
  Eye,
  MessageCircle,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Search,
  X
} from "lucide-react";

import styles from "./BoardList.module.css";
import { UseBoardList } from "./UseBoardList";
import PageNaviBar from "../../../common/pageNavi/PageNavi";

const BoardList = () => {
  const {
    CATEGORY_MAP,
    CATEGORY_MAP_REVERSE,
    activeCategory,
    typeBtn,
    page,
    count,
    totalCount,
    mergedList,
    thumbsUrlMap,
    isSearching,
    findTarget,

    toWrite,
    setPage,
    handleTopBtn,
    handleCardClick,
    handleMenuClick,
    handleFindTarget,
    handleSendFindTarget,
    clearSearch,
  } = UseBoardList();

  return (
    <div className={styles.container}>

      {/* 카테고리 */}
      <div className={styles.header}>
        {/* 왼쪽 그룹: 카테고리 */}
        <div className={styles.leftGroup}>
          <div className={styles.categoryList}>
            {Object.keys(CATEGORY_MAP).map(cat => (
              <button
                key={cat}
                className={`${styles.categoryItem} ${activeCategory === cat ? styles.active : ""
                  }`}
                onClick={() => handleTopBtn(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 오른쪽 그룹: 글작성 버튼 + 검색창 */}
        <div className={styles.rightGroup}>
          <button className={styles.writeButton} onClick={toWrite}>
            글 작성
          </button>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className={styles.searchInput}
              value={findTarget}
              onChange={handleFindTarget}
              disabled={isSearching}
            />
            {isSearching ? (
              // X 아이콘
              <X
                className={styles.searchIcon}
                size={24}
                onClick={clearSearch} // 검색 리셋 함수
              />
            ) : (
              // 돋보기 아이콘
              <Search
                className={styles.searchIcon}
                size={24}
                onClick={handleSendFindTarget} // 검색 실행
              />
            )}
          </div>
        </div>
      </div>

      {/* 리스트 */}
      <div className={styles.cardGrid}>
        {mergedList.length === 0 ? (

          //게시글 존재하지 않을때
          <div className={styles.emptyMessage}>
            게시글이 존재하지 않습니다
          </div>
        ) : (

          //게시글 존재할 때
          <ul className={styles.gridContainer}>
            {mergedList.map((item) => (
              <li
                key={item.board.board_seq}
                className={styles.card}
                onClick={() => handleCardClick(item.board.board_seq)}
              >
                <div className={styles.cardHeader}>
                  <img
                    src={thumbsUrlMap[item.board.board_seq]}
                    alt=""
                    className={styles.cardImage}
                  />
                  {console.log("썸네일 주소", thumbsUrlMap)}
                  <button className={styles.menuBtn} onClick={handleMenuClick}>
                    <MoreHorizontal size={24} />
                  </button>
                </div>

                <div className={styles.content}>
                  <div className={styles.textGroup}>
                    <span
                      className={`${styles.categoryTag} ${styles[CATEGORY_MAP_REVERSE[item.board.board_type]]
                        }`}
                    >
                      {CATEGORY_MAP_REVERSE[item.board.board_type]}
                    </span>

                    <h3 className={styles.title}>{item.board.title}</h3>
                    <p className={styles.description}>{item.preview}</p>
                  </div>

                  <div className={styles.stats}>
                    <div className={styles.statItem}>
                      <Eye size={16} />
                      <span>{item.board.view_count}</span>
                    </div>
                    <div className={styles.statItem}>
                      <MessageCircle size={16} />
                      <span>댓글수 넣기</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>


      <div className={styles.pagination}>
        <PageNaviBar page={page} setPage={setPage} count={count} totalCount={totalCount} typeBtn={typeBtn} />
      </div>
    </div>
  );
};

export default BoardList;
