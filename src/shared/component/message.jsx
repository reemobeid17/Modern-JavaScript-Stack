// @flow

import * as React from "react";

type Props = {
  message: string,
};

const Message = ({ message }: Props): React.Node => <p>{message}</p>;

export default Message;
