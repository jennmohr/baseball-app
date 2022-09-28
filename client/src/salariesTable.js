// main resource referenced: https://react-table-library.com/

import * as React from 'react';
import { NumericFormat } from 'react-number-format';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { usePagination } from '@table-library/react-table-library/pagination';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';

const SalariesTable = (props) => {
  const data = { nodes: props.list };
  const theme = useTheme(getTheme());
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: props.size,
    }, 
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state){
    console.log(action, state);
  }

  function convertName(name) {
    const firstName = name.substring(name.indexOf(" "));
    const lastName = name.substring(0, name.indexOf(" "));
    const cName =  firstName + " " + lastName;
    return cName.replace(/[,]/g, "");
}

  // base table: https://react-table-library.com/?path=/docs/compact-table--base
  // table theme: https://react-table-library.com/?path=/docs/compact-table--theme
  // pagination: https://react-table-library.com/?path=/docs/compact-table--pagination

  return (
    <div style={{height: "450px"}}>
      <Table data={data} theme={theme} pagination={pagination} layout={{ fixedHeader: true }}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Player</HeaderCell>
                <HeaderCell>Salary</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>{convertName(item.name)}</Cell>
                  <Cell>{item.salary ? 
                  <NumericFormat
                    value={Math.round(item.salary)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  /> : "N/A"}</Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }} className="paginationStyle">
        <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

        <span>
          Page:{' '}
          {pagination.state.getPages(data.nodes).map((_, index) => (
            <button
              key={index}
              type="button"
              style={{
                fontWeight: pagination.state.page === index ? 'bold' : 'normal',
              }}
              onClick={() => pagination.fns.onSetPage(index)}
            >
              {index + 1}
            </button>
          ))}
        </span>
      </div>
     </div>
  );
};

export default SalariesTable;