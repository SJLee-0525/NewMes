import instance from "@apis/instance";

import type { MediType } from "@/types/MediType";

const { VITE_MEDI_API_KEY } = import.meta.env;

/**
 * 질병 목록을 가져옵니다.
 * @param numOfRows 한 페이지 결과 수 (기본값: 20)
 * @param pageNo 페이지 번호 (기본값: 1)
 * @param sickType 상병 구분  (1: 3단 상병, 2: 4단 상병) (기본값: 1)
 * @param medTp 양방, 한방 구분(1: 양방, 2: 한방) (기본값: 1)
 * @param diseaseType 질병 검색 타입(SICK_CD: 상병코드, SICK_NM: 상병명) (기본값: "SICK_NM")
 * @param searchText 검색어 (기본값: " ")
 * @returns 질병 목록 데이터
 * @see {@link https://www.data.go.kr/data/15012624/openapi.do}
 */
export const getDiseaseList = async ({
  numOfRows = 20,
  pageNo = 1,
  sickType = 1,
  medTp = 1,
  diseaseType = "SICK_NM",
  searchText = " ",
}): Promise<MediType[]> => {
  try {
    const response = await instance.get(
      `https://apis.data.go.kr/B551182/diseaseInfoService1/getDissNameCodeList1?serviceKey=${VITE_MEDI_API_KEY}&numOfRows=${numOfRows}&pageNo=${pageNo}&sickType=${sickType}&medTp=${medTp}&diseaseType=${diseaseType}&searchText=${searchText}`
    );
    console.log("Disease List", response.data);
    return response.data.response.body.items.item as MediType[];
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
