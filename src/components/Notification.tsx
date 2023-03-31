//  Modules
import { Component } from "react";

class Notification extends Component {
  constructor() {
    super("");
    this.showNotification = this.showNotification.bind(this);
  }

  componentDidMount() {
    if (!("Notification" in window)) {
      console.log("Browser does not support desktop notification");
    } else {
      window.Notification.requestPermission();
    }
  }

  showNotification() {
    var options: NotificationOptions = {
      body: "Notification Body",
      icon: "https://www.vkf-renzel.com/out/pictures/generated/product/1/356_356_75/r12044336-01/general-warning-sign-10836-1.jpg?    auto=compress&cs=tinysrgb&dpr=1&w=500",
      dir: "ltr",
    };

    new window.Notification("Hello World", options);
  }

  render() {
    return (
      <div>
        <button onClick={this.showNotification}>Show notification</button>
      </div>
    );
  }
}

export default Notification;
