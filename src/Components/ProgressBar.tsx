import React, { useEffect, useState } from "react";
import { ITask } from "../Interfaces";

type Props = {
  todoList: ITask[];
};

const ProgressBar: React.FC<Props> = ({ todoList }) => {
  const [percentage, setPercentage] = useState<number>();
  const progressContainer = {
    backgroundColor: "#E07C7C",
    width: "100%",
    height: "123px",
    borderRadius: "20px",
    padding: "0.1em 1em 0.1em 1em",
    color: "#FFFFFF",
  };

  const progress = {
    width: "100%",
    height: "7.34px",
    backgroundColor: "#3B3B3B",
    borderRadius: "999px",
  };

  useEffect(() => {
    const totalCount = todoList.length;
    const completeCount = todoList.filter(td => td.completed === true)?.length;
    const percentEach = (completeCount / totalCount) * 100;
    setPercentage(percentEach);
  }, [todoList]);

  const bar = {
    width: `${percentage}%`,
    height: "7.34px",
    backgroundColor: "#FFFFFF",
    borderRadius: "999px 0px 0px 999px",
  };

  return (
    <div style={progressContainer}>
      <div style={{ textAlign: "left" }}>
        <h3>Progress</h3>
      </div>
      <div style={progress}>
        <div style={bar}></div>
      </div>
      <div style={{ textAlign: "left", fontSize: "14px", color: "#EBB9B8" }}>
        <p>{todoList.filter(td => td.completed === true)?.length} completed</p>
      </div>
    </div>
  );
};
export default ProgressBar;
// export const ProgressBar = (props) => {
//   const { progress, noLabel, noTarget, color, width } = props;

//   return (
//     <div className="row justify-content-center d-flex align-items-center m-0" >
//       <div
//         className="progress col-10 p-0"
//         style={{
//           width: width || 125,
//           height: "8px",
//           borderRadius: 10,
//           background: 'rgb(255, 255, 255,0.1)'
//         }}
//       >
//         <div
//           className="progress-bar"
//           role="progressbar"
//           aria-valuenow="1"
//           aria-valuemin="0"
//           aria-valuemax="100"
//           style={{
//             marginTop: 2,
//             marginLeft: 2.5,
//             marginRight: 2.5,
//             height: 4,
//             width: `${progress}%`,
//             background: "#2982ff",
//             transition: "width .5s",
//             borderRadius: 10,
//           }}
//         >
//         </div>

//       </div>
//       {noLabel || <div className="col-2" style={{ fontSize: 12 }}>{progress}%</div>}
//     </div>
//   );
// };
