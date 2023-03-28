import { ErrorProps } from "../types/interfaces";

const Error = (props: ErrorProps) => {
  const { error } = props;
  return (
    <div>
      <h1 className="text-xl h-screen pt-7">Error: {error.message}</h1>
    </div>
  );
};

export default Error;
