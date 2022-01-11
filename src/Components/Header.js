import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.Header}>
      <a href="/">
        <img
          className={classes.Logo}
          src="https://uxwing.com/wp-content/themes/uxwing/download/27-weather/weather.png"
          alt="Weather"
        />
      </a>

      <h3 className={classes.Name}>Weather</h3>
    </header>
  );
}

export default Header;
