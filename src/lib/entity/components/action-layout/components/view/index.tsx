import { useCustomPage } from "@lib/entity/hooks/useCustomPage";
import React, { memo } from "react";

const ViewPage = memo(() => {
  const pages = useCustomPage();

  const page = pages?.view?.render ? pages?.view?.render : () => "";
  return <div className="p-2">{page()}</div>;
});
ViewPage.displayName = "ViewPage";
export default ViewPage;
