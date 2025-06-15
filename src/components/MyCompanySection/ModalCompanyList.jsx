import ModalCompanyListItem from "./ModalCompanyListItem";

function ModalCompanyList({ name, companies }) {
  const recentCount = 3;
  let listTitle = "";
  let modalCompanies = [];

  // 여기서 name 입력된 사항에 따라서 최근 비교한 기업 항목 혹은 검색 결과 항목을 보여줍니다
  // 그리고 name 별로 각각 다른 필터를 프롭스로 받은 companies에 적용해서, 실제로 보여줄 데이터를 고릅니다.
  // 이건 근데 db랑 연동되어서 해야 하는 부분이라 아직 구현 덜 되어 있음 (서치바랑 페이지네이션도 . . )

  switch (name) {
    case "recent":
      listTitle = `최근 비교한 기업 (${recentCount})`;
      modalCompanies = [];
      break;
    case "search":
      listTitle = "검색 결과";
      modalCompanies = [];
      break;
  }

  return (
    <div>
      <p>{listTitle}</p>
      <ul className="companyList">
        {companies.map((company) => (
          <ModalCompanyListItem key={company.id} company={company} />
        ))}
      </ul>
    </div>
  );
}

export default ModalCompanyList;
