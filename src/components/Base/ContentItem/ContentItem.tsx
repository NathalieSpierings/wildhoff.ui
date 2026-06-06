import React, { ReactElement, ReactNode } from 'react';

export interface ContentItemType {
    id?: string | number;
    gap?: string;
    prefix?: ReactNode;
    prefixItemPosition?: 'item-start' | 'item-center' | 'item-end';
    prefixGap?: string;
    contentCss?: string;
    content?: ReactNode;
    contentItemPosition?: 'item-start' | 'item-center' | 'item-end';
    contentJustifyPosition?: 'justify-start' | 'justify-center' | 'justify-end';
    postfix?: ReactNode;
    postfixItemPosition?: 'item-start' | 'item-center' | 'item-end';
    postfixGap?: string;
    separatorAfterPrefix?: boolean;
    separatorAfterMeta?: boolean;
}

export interface ContentItemProps {
    item: ContentItemType;
}

const ContentItem: React.FC<ContentItemProps> = ({ item }) => {

    return (
        <div className="content-item" key={item.id ?? 'contentItem'}>
            {item.prefix && (
                <div className={`content-item__prefix ${item.prefixItemPosition ? item.prefixItemPosition : ''}`} style={{ gap: item.prefixGap }}>
                    {item.prefix}
                </div>
            )}
            {item.separatorAfterPrefix && (
                <div className="content-item__separator"></div>
            )}
            {item.content && (
                <div className={`content-item__meta ${item.contentCss ? item.contentCss : ''} ${item.contentItemPosition ? item.contentItemPosition : ''} ${item.contentJustifyPosition ? item.contentJustifyPosition : ''}`} >
                    {item.content}
                </div>
            )}
            {item.separatorAfterMeta && (
                <div className="content-item__separator"></div>
            )}
            {item.postfix && (
                <div className={`content-item__postfix ${item.postfixItemPosition ? item.postfixItemPosition : ''}`} style={{ gap: item.postfixGap }}>
                    {item.postfix}
                </div>
            )}
        </div>

    );
};

export default ContentItem;
