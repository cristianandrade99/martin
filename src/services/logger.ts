const pretify = (data: unknown) => JSON.stringify(data, null, 1);

const info = (message: string, data?: unknown) => {
  console.log(pretify(message), data);
};

const error = (message: string, data?: unknown) => {
  console.error(pretify(message), data);
};

const warn = (message: string, data?: unknown) => {
  console.warn(pretify(message), data);
};

export default { error, info, warn };
