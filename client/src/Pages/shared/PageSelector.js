import React from 'react'

export default function PageComponent(props) {
    const { maxPages, searchPage, setSearchPage } = props
    
    const renderPageBtn = (pageNumber) => {
        if (pageNumber > maxPages + 1) return null;
        if (pageNumber < 1) return null;

        return (
            // Darken the btn if it's the current btn
            <div onClick={() => setSearchPage(pageNumber - 1)} 
            className={`px-4 py-2 font-bold border-secondary border-r-2 ${pageNumber - 1 === searchPage ? 'bg-gray-300':'bg-gray-100'} cursor-pointer`}
            >
                {pageNumber}
            </div>
        );
    };

    return (
        <div className='flex justify-center'>
            <div onClick={() => searchPage === 0 ? null:setSearchPage(searchPage - 1)} className='flex px-3 py-2 rounded-l-lg border-secondary border-r-2 bg-gray-100 cursor-pointer'>
                <svg className='w-4' viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/></svg>
            </div>
            {renderPageBtn(1)}

            {/* Don't show any other page btns if we only have one max page */}
            {maxPages === 1 ? null:
            <>
            {/* Don't show the previous page btn if there if we are on Page 1/2 */}
            {searchPage === 1 ? null:renderPageBtn(searchPage)}

            {/* Don't show the currnt page btn if we are on the first page or on the last */}
            {searchPage === 0 || searchPage === maxPages - 1 ? null:renderPageBtn(searchPage + 1)}

            {/* Don't show the next page btn if we are on the second to last or last page */}
            {searchPage > maxPages - 3 ? null:renderPageBtn(searchPage + 2)}

            {/* Don't show the '...' if we are on the second to last or last page */}
            {searchPage > maxPages - 3 ? null:<div className='px-4 py-2 font-bold border-secondary border-r-2 bg-gray-100 cursor-pointer'>...</div>}

            {renderPageBtn(maxPages)}
            </>}

            <div onClick={() => searchPage === maxPages ? null:setSearchPage(searchPage + 1)} className='flex px-3 py-2 rounded-r-lg bg-gray-100 cursor-pointer'>
                <svg className='w-4' viewBox="0 0 24 24"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g></svg>
            </div>
        </div>
    );
};
