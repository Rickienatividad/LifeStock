import axios from "axios";
import "../style/Login.css";

export function Login() {
  const clearUser = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("rig");
  };
  const handleSubmit = (event) => {
    //overrides the submit button normal behavior in the form
    event.preventDefault();
    const params = new FormData(event.target);

    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.jwt}`;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        response.data.user_admin === true
          ? (window.location.href = "/supervisor")
          : (window.location.href = "/field");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };
  return (
    <div className="login_container">
      <div className="login_form_container">
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="star_of_life"></div>
          <div className="title">
            <strong>L</strong>IFESTOCK
          </div>
          <label>
            <input
              className="login_form_email_input"
              type="email"
              placeholder="Email "
              name="email"
              onClick={clearUser()}
            ></input>
          </label>
          <label>
            <input
              className="login_form_password_input"
              type="password"
              placeholder="Password"
              name="password"
            ></input>
          </label>
          <button className="login_submit" type="submit">
            Submit
          </button>
        </form>
      </div>
      <div className="login_options1"></div>
      <div className="login_options2"></div>
      <div className="login_options3"></div>
      <div className="login_options4"></div>
      <div className="login_options5"></div>
      <div className="login_options6"></div>
      <div className="login_overlay"></div>
    </div>
  );
}
