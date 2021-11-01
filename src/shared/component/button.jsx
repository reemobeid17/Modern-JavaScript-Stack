// @flow

import * as React from "react";

type Props = {
  label: string,
  handleClick: Function,
};

const Button = ({ label, handleClick }: Props): React.Node => (
  <button onClick={handleClick} className="btn btn-primary" type="button">
    {label}
  </button>
);

export default Button;
