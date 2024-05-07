import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from "../index";
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const { device } = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);

    return (
        <Pagination className='mt-3 justify-content-center'>
            <Pagination.First onClick={() => device.setPage(1)} />
            <Pagination.Prev onClick={() => device.setPage(Math.max(device.page - 1, 1))} />
            {Array.from({ length: pageCount }).map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={device.page === index + 1}
                    onClick={() => device.setPage(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => device.setPage(Math.min(device.page + 1, pageCount))} />
            <Pagination.Last onClick={() => device.setPage(pageCount)} />
        </Pagination>
    );
});

export default Pages;