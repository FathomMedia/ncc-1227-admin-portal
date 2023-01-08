import EventEmitter from "events";
import React from "react";
import { BsFillEyeFill } from "react-icons/bs";
import { HiDotsVertical, HiOutlineClipboardList } from "react-icons/hi";

interface Props {
  headers: String[];
  data?: TableData[];
  viewClick: (event: any) => {};
  historyClick: (event: any) => {};
}

export interface TableData {
  id: string;
  data: any;
}

export default function TableComponent({
  headers,
  data,
  viewClick,
  historyClick,
}: Props) {
  return (
    <div>
      <div className="overflow-x-auto w-full h-screen">
        <table className="table w-full ">
          <thead className=" border rounded-xl border-nccGray-100">
            <tr>
              {headers.map((title, index) => (
                <th className=" bg-nccGray-100" key={index}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((datum, index) => (
              <tr key={index}>
                <th key={datum?.id}>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      title="aLabel"
                    />
                  </label>
                </th>
                {datum?.data.map((hi: any, index: number) => (
                  <td key={index}>
                    <div className=" flex justify-between">{`${hi}`}</div>
                  </td>
                ))}

                <td>
                  <button className="btn btn-ghost btn-xs relative group">
                    <HiDotsVertical />
                    <div className=" hidden absolute right-6 top-5 bg-white shadow-lg p-1 rounded-lg group-focus:flex flex-col min-w-min">
                      <div
                        className="btn btn-ghost btn-xs hover:bg-anzac-100 hover:cursor-pointer hover:text-anzac-500 flex justify-start w-24 gap-2"
                        onClick={() => viewClick(datum?.id)}
                      >
                        <BsFillEyeFill />
                        View
                      </div>
                      <div
                        className="btn btn-ghost btn-xs hover:bg-anzac-100 hover:cursor-pointer hover:text-anzac-500 flex justify-start w-24 gap-2"
                        onClick={() => {
                          historyClick;
                        }}
                      >
                        <HiOutlineClipboardList />
                        History
                      </div>
                    </div>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
}
