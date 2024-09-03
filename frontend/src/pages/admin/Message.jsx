import React from "react";
import image from "../../assets/image.svg";
import "../../assets/css/message.css"

const Message = () => {
  return (
    <div className="message-content">
      <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
    <div>
      <div className="left-[345px] top-[75px] absolute text-black text-xl font-normal font-['Poppins']">
        Admin Infinite Learning Shop
      </div>
      <div className="left-[345px] top-[30px] absolute text-violet-600 text-[32px] font-bold font-['Poppins']">
        Message
      </div>

      <div
        className="chatlist"
        style={{
          width: 336,
          height: 600,
          left: 345,
          top: 129,
          position: "absolute",
          background: "white",
          boxShadow: "0px 0px 5.5px rgba(0, 0, 0, 0.25)",
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
      >
        <div style={{ padding: "13px", position: "relative" }}>
          <input
            type="text"
            placeholder=" Search Here           &#xF002;"
            style={{
              fontFamily: "Arial, FontAwesome",
              width: "calc(100% - 24px)",
              padding: "8px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              textAlign: "center",
              fontSize: "12px",
              paddingLeft: "24px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "8px",
            }}
          ></div>
        </div>

        <div class="chatlist">
          <div class="block active">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Jhon Doe</h4>
              </div>
              <div class="message_p">
                <p>How are you doing?</p>
              </div>
            </div>
          </div>

          <div class="block unread">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Andre</h4>
              </div>
              <div class="message_p">
                <p>I love your youtube videos!</p>
                <b>1</b>
              </div>
            </div>
          </div>

          <div class="block unread">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Olivia</h4>
              </div>
              <div class="message_p">
                <p>I just subscribed to your channel</p>
                <b>2</b>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Parker</h4>
              </div>
              <div class="message_p">
                <p>Hey!</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Zoey</h4>
              </div>
              <div class="message_p">
                <p>I'll get back to you</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Josh</h4>
              </div>
              <div class="message_p">
                <p>Congratulations</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Dian</h4>
              </div>
              <div class="message_p">
                <p>Thanks alot</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Sam</h4>
              </div>
              <div class="message_p">
                <p>Did you finish the project?</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Junior</h4>
              </div>
              <div class="message_p">
                <p>Nice course</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Zoey</h4>
              </div>
              <div class="message_p">
                <p>I'll get back to you</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Josh</h4>
              </div>
              <div class="message_p">
                <p>Congratulations</p>
              </div>
            </div>
          </div>
          <div class="block">
            <div class="imgBox">
              <img src={image} class="cover" alt="" />
            </div>
            <div class="details">
              <div class="listHead">
                <h4>Dian</h4>
              </div>
              <div class="message_p">
                <p>Thanks alot</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="chatbox"
        style={{
          width: 700,
          height: 600,
          left: 683,
          top: 129,
          position: "absolute",
          background: "white",
          boxShadow: "0px 0px 5.5px rgba(0, 0, 0, 0.25)",
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
        }}
      >
        <div class="header">
          <div class="imgText">
            <div class="userimg">
              <img src={image} class="cover" alt="" />
            </div>
            <h4>
              Aini <br />
              <span>Last seen 1 hour ago</span>
            </h4>
          </div>
        </div>
        <div class="chatbox">
          <div class="message my_msg">
            <p>
              Hi <br />
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Hey <br />
            </p>
          </div>
          <div class="message my_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            </p>
          </div>
          <div class="message my_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Eaque aliquid
              fugiat accusamus dolore qui vitae ratione optio sunt <br />
              <span>12:15</span>
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            </p>
          </div>
          <div class="message my_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur <br />
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message my_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message my_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message my_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message my_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
          <div class="message friend_msg">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              <br />
            </p>
          </div>
        </div>

        <div class="chat_input">
          <ion-icon
            name="happy-outline"
            style={{ color: "#8A3DFF" }}
          ></ion-icon>
          <input
            type="text"
            placeholder="Type a message"
            style={{ backgroundColor: "#F3ECFF" }}
          />
          <ion-icon name="paper-plane" style={{ color: "#8A3DFF" }}></ion-icon>
        </div>
      </div>
      </div></div></div>
  );
};

export default Message;
