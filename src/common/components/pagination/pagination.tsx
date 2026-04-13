import { getPaginationPages } from '@/common/utils/getPaginationPages';
import s from './pagination.module.scss';
import { PageSizeSelector } from '@/common/components/pagination/pageSizeSelector/pageSizeSelector';

type Props = {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pagesCount: number;
  pageSize: number;
  changePageSize: (pageSize: number) => void;
};

export const Pagination = ({
  currentPage,
  setCurrentPage,
  pagesCount,
  pageSize,
  changePageSize,
}: Props) => {
  if (pagesCount <= 1) return null;

  const pages = getPaginationPages(currentPage, pagesCount);

  return (
    <div className={s.container}>
      <div className={s.pagination}>
        {pages.map((page, idx) =>
          page === '...' ? (
            <span className={s.ellipsis} key={`ellipsis-${idx}`}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={
                page === currentPage ? `${s.pageButton} ${s.pageButtonActive}` : s.pageButton
              }
              onClick={() => page !== currentPage && setCurrentPage(Number(page))}
              disabled={page === currentPage}
              type="button">
              {page}
            </button>
          ),
        )}
      </div>
      <PageSizeSelector pageSize={pageSize} changePageSize={changePageSize} />
    </div>
  );
};
