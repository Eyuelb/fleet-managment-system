import React from "react";
import { useFilter } from "../../../../hooks/useFilter";
import { FieldValues } from "react-hook-form";
import { IconFilter } from "@tabler/icons-react";
import { FormBuilder } from "@lib/form-builder";
import { useTableReset } from "@lib/entity/hooks/useTableReset";
import { useMemoizedStateContext } from "@lib/entity/hooks/useMemoizedStateContext";
import { useDataTableContext } from "@lib/data-table/contexts/table";

const FilterGenerator = () => {
  const { setState,state } = useMemoizedStateContext<Object>();
  const { setPagination, stateKey } = useDataTableContext();
  const reset = useTableReset();

  const filter = useFilter();
  const { fields } = filter ?? {};
  const filtersWithProps = fields?.map((field) => ({
    ...field,
    componentProps: {
      size: "xs",
      className:
        "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground  text-xs h-8 gap-0 truncate rounded-full",
      styles: {
        input: {
          "--input-placeholder-color": "var(--mantine-color-text)",
          "--input-bd":  "transparent",
          fontWeight: 500,
          width: "120px",
        },
      },
      ...field.componentProps,
    },
  }));
  const handleFilterChange = (values: FieldValues) => {
    // Update filter values
    setState(values);
    // Reset filtered pagination to first page
    setPagination((prevPagination) => ({
      ...prevPagination,
      pageIndex: 1,
    }));
  };
  return (
    <div className="">
      <FormBuilder
        key={stateKey}
        className="w-full py-2 flex gap-2 justify-start flex-wrap"
        onSubmit={handleFilterChange}
        fields={filtersWithProps ?? []}
        buttonProps={{
          bg: "var(--mantine-primary-color-filled)",
          color: "white",
          children: <IconFilter color="white" />,
          className: "h-[29px] w-[40px]",
        }}
        buttonWrapperProps={{
          className: "flex justify-end h-auto",
        }}
        renderActionButton={
          <div className="flex gap-2 ml-4 items-center">

            <button
              className=" text-xs border rounded-xl px-3 flex items-center shadow-sm"
              type="submit"
            >
              <span>
                <IconFilter size={13} className="mr-1" />
              </span>
              <span>Filter</span>
            </button>

            <button
              className=" text-xs border rounded-xl px-3 flex items-center shadow-sm"
              onClick={() => reset()}
              hidden={!state}

            >
              <span className="mr-1">x</span>
              <span>Reset</span>
            </button>
          </div>
        }
      />
    </div>
  );
};

export { FilterGenerator };
