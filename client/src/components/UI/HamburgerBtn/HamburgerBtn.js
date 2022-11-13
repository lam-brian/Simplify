import "./HamburgerBtn.css";

const HamburgerBtn = ({ toggleNav, isOpen }) => {
  return (
    <button
      class={`hamburger hamburger--spin ${isOpen ? "is-active" : ""}`}
      type="button"
      onClick={toggleNav}
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default HamburgerBtn;
