import type { FC, LabelHTMLAttributes } from "react";

const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700">{children}</label>
);
export default Label;
