import React, { ReactElement, useState } from "react";
import useTableQueryClientFilter from "../../lib/hooks/useTableQueryClientFilter";
import { getProductsQuery, ProductGetModel } from "../../lib/testdata/models";
import { Datagrid } from "../../components/Data/Datagrid";
import { DatagridGetDataArguments } from "../../components/Data/Datagrid/Config/DatagridData";
import useDatagridQueryClientFilter from "../../components/Data/Datagrid/Hooks/useDatagridQueryClientFilter";

const DataTablePage = (): ReactElement => {

    const [tableOptions, setTableOptions] = useState<DatagridGetDataArguments<ProductGetModel> | null>(null);
    const [dataRaw, data, total, status] = useDatagridQueryClientFilter({
        queryFn: getProductsQuery(),
        filters: tableOptions
    });


    return (
        <Datagrid
            data={data || []}
            dataRaw={dataRaw}
            total={total || 0}
            loading={status === "pending"}
            onFilterUpdate={setTableOptions}
            columns={[
                { prop: "sku", title: "SKU", sortable: true, },
                { prop: "naam", title: "Naam", sortable: true, },
                { prop: "omschrijving", title: "Omschrijving", sortable: true, },
                { prop: "categorie", title: "Categorie", sortable: true, },
                { prop: "prijs", title: "Prijs", sortable: true, transformValue: (value: unknown) => `€ ${value}`, },
                { prop: "merk", title: "Merk", sortable: true, },
                { prop: "status", title: "Status", sortable: true, },
                { prop: "voorraad", title: "Voorraad", sortable: true, },
                { prop: "beschikbaar", title: "Beschikbaar", sortable: true, },
                { prop: "kleur", title: "Kleur", sortable: true, },
                { prop: "materiaal", title: "Materiaal", sortable: true, },
                { prop: "garantiemaanden", title: "Garantiemaanden", sortable: true, },
                { prop: "minOrderAantal", title: "Min Order Aantal", sortable: true, },
                { prop: "maxOrderAantal", title: "Max Order Aantal", sortable: true, },
            ]}    
               />
    )
}

export default DataTablePage;