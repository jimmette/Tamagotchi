import myStore from "./Store";
import CONSTANTS from "./Constants";

let backupTammy = () => {
  console.log("in backup Tammy");
  let data = JSON.parse(JSON.stringify(myStore.getState()));
  data.saveTime = new Date();
  data.currentPage = CONSTANTS.homepage;
  data.displayMessage = "";
  body = JSON.stringify(data);
  fetch("http://10.65.105.164:4000/backup", {
    method: "POST",
    body: body
  })
    .then(res => {
      return res.text();
    })
    .then(responseBody => {
      let body = JSON.parse(responseBody);
      // if (data._id === "") {
      myStore.dispatch({ type: "SETUP_ID", payload: body.newId });
      // }
    });
};

let restoreTammy = () => {
  console.log("in restore Tammy");
  if (myStore.getState()._id !== "") {
    let body = JSON.stringify({ _id: myStore.getState()._id });
    fetch("http://10.65.105.164:4000/restore", {
      method: "POST",
      body: body
    })
      .then(res => {
        return res.text();
      })
      .then(responseBody => {
        let body = JSON.parse("rb", responseBody);
        console.log(body.state);
        // myStore.dispatch({ type: "RESTORE_DATA", payload: body.state });
      });
  }
};

let deleteTammy = () => {};

export { backupTammy, restoreTammy, deleteTammy };
