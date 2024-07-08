import React from "react";
import useEntity from "../../hooks/useEntity";
import { useActions } from "../../hooks/useActions";
import DynamicImporter from "@components/dynamic-importer";

const ActionLayout = () => {
  const actions = useActions();
  const { operation, feat, entityId } = useEntity();
  return (
    <>
      <DynamicImporter
        validation={operation === "create" && actions?.isCreate === true}
        importPath={() => import("./components/form")}
        key='create'
      />
      <DynamicImporter
        validation={
          operation === "update" && actions?.isUpdate === true && !!entityId
        }
        importPath={() => import("./components/form")}
        key='update'
      />
      <DynamicImporter
        validation={operation === "list" && actions?.isList === true}
        importPath={() => import("./components/list")}
      />
      <DynamicImporter
        validation={
          operation === "view" && actions?.isView === true && !!entityId
        }
        importPath={() => import("./components/view")}
      />
    </>
  );
};
export default ActionLayout;
