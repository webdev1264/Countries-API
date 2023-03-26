interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onClick: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onClick,
}) => {
  return (
    <ul className="pageNumbers">
      Page:
      {[...Array(totalPages)].map((_, index) => (
        <li
          key={index}
          className={`pageNumber ${currentPage === index + 1 ? "active" : ""}`}
          onClick={() => {
            onClick(index + 1);
            window.scrollTo({ top: 360, behavior: "smooth" });
          }}
        >
          {index + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
