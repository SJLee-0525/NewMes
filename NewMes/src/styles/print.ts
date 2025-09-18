export const DETAIL_REPORT_PRINT_STYLE = `
@media print {
  body {
    margin: 0;
    padding: 48px 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-family: 'Pretendard', sans-serif;
    background-color: #ffffff;
    color: #000000;
    line-height: 1.33;
  }

  #print-area {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    height: auto;
    box-sizing: border-box;
  }

  #print-area > h1 {
    font-size: 40px;
    font-weight: bold;
    margin: 0;
  }

  #print-area .top-area {
    display: flex;
    width: 100%;
    height: fit-content;
    gap: 8px;
  }

  #print-area .top-area figure {
    width: 50%;
    aspect-ratio: 16 / 17;
    border-radius: 12px;
    overflow: hidden;
  }

  #print-area .top-area figure img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  #print-area .top-area figure span {
    display: none;
  }

  #print-area .top-area .top-right-area {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    gap: 16px;
    justify-content: space-between;
    align-items: center;
  }

  #print-area .detail-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding: 0px 20px;
    gap: 12px;
    border-radius: 12px;
    background-color: #f0f0f0;
    box-sizing: border-box;
  }

  #print-area .detail-box header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: fit-content;
  }

  #print-area .detail-box header h3 {
    width: 100%;
    height: fit-content;
    font-weight: 600;
    font-size: 1.25rem;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  #print-area .detail-box header svg {
    display: none;
  }

  #print-area .detail-box section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }

  #print-area .detail-box section ul {
    width: 100%;
    height: fit-content;
    font-weight: 600;
    list-style-type: disc;
    padding-left: 20px;
  }

  #print-area .detail-box section ul li {
    margin-bottom: 4px;
  }

  #print-area .detail-box section p {
    font-weight: 400;
    text-align: left;
  }

  /* 인쇄 시 페이지 나누는 역할: always 속성은 이 클래스가 적용된 요소 바로 뒤에서 항상 페이지가 나뉘도록 강제 */
  .page-break {
    page-break-after: always;
  }
}`;
