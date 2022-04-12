import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import galleryData from '../data';

import { orderBy, range } from 'lodash';

const Gallery = () => {
    const [images, setImages] = useState(galleryData);

    useEffect(() => {
        const data = localStorage.getItem('images');
        if (data) {
            setImages(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('images', JSON.stringify(images));
    }, [images]);

    const renderImages = orderBy(images, 'position').map((item) => (
        <Draggable
            draggableId={item.id.toString()}
            index={item.position}
            key={item.id}>
            {(provided) => (
                <div
                    className='card'
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}>
                    <div className='card__info'>
                        <p className='card__info-title'>{item.title}</p>
                        <p className='card__info-subtitle'>{item.subtitle}</p>
                    </div>
                    <img src={item.img} alt={item.subtitle} />
                </div>
            )}
        </Draggable>
    ));

    const onDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const directionOfDrag =
            destination.index > source.index ? 'GREATER' : 'LESS';

        let affectedRange;
        if (directionOfDrag === 'GREATER') {
            affectedRange = range(source.index, destination.index + 1);
        } else if (directionOfDrag === 'LESS') {
            affectedRange = range(destination.index, source.index);
        }

        const reOrderedImage = images.map((image) => {
            if (image.id === parseInt(result.draggableId)) {
                image.position = result.destination.index;

                return image;
            } else if (affectedRange.includes(image.position)) {
                if (directionOfDrag === 'GREATER') {
                    image.position = image.position - 1;

                    return image;
                } else if (directionOfDrag === 'LESS') {
                    image.position = image.position + 1;

                    return image;
                }
            } else {
                return image;
            }
        });
        setImages(reOrderedImage);
    };
    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'IMG_ID'}>
                    {(provided) => (
                        <main ref={provided.innerRef} {...provided.droppableProps}>
                            {renderImages}
                            {provided.placeholder}
                        </main>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Gallery;