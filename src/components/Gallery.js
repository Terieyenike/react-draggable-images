import React, { useState } from 'react';
import galleryData from '../data';

import { orderBy } from 'lodash';

const Gallery = () => {
    const [images, setImages] = useState(galleryData);

    const renderImages = orderBy(images, 'position').map((item) => (
        <div className='card'>
            <div className='card__info'>
                <p className='card__info-title'>{item.title}</p>
                <p className='card__info-subtitle'>{item.subtitle}</p>
            </div>
            <img src={item.img} alt={item.subtitle} />
        </div>
    ));

    return (
        <div>
            <main>{renderImages}</main>
        </div>
    );
};

export default Gallery;
