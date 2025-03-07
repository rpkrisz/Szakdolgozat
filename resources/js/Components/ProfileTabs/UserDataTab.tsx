import {User as FirebaseUser} from "firebase/auth";
import {FC} from "react";

const UserDataTab: FC<{userData: FirebaseUser}> = ({userData}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <tbody>
          <tr>
            <th>User name</th>
            <td> {userData.displayName} </td>
          </tr>
          <tr>
            <th>Email</th>
            <td> {userData.email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTab;
