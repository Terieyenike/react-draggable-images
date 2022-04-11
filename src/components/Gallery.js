import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import galleryData from '../data';

import { orderBy, range } from 'lodash';

const Gallery = () => {
  const [images, setImages] = useState(galleryData);

  const renderImages = orderBy(images, 'position').map(
    ({ img, title, subtitle, id, position }) => (
      <Draggable draggableId={id.toString()} index={position} key={id}>
        {(provided) => (
          <div
            className='card'
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}>
            <div className='card__info'>
              <p className='card__info-title'>{title}</p>
              <p className='card__info-subtitle'>{subtitle}</p>
            </div>
            <img src={img} alt={subtitle} />
          </div>
        )}
      </Draggable>
    )
  );

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
      destination.index > source.index ? 'greater' : 'less';

    let affectedRange;
    if (directionOfDrag === 'greater') {
      affectedRange = range(source.index, destination.index + 1);
    } else if (directionOfDrag === 'less') {
      affectedRange = range(destination.index, source.index);
    }

    const reOrderedImage = images.map((image) => {
      if (image.id === parseInt(result.draggableId)) {
        image.position = result.destination.index;
        return image;
      } else if (affectedRange.includes(image.position)) {
        if (directionOfDrag === 'greater') {
          image.position = image.position - 1;
          return image;
        } else if (directionOfDrag === 'less') {
          image.position = image.position + 1;
          return image;
        } else {
          return image;
        }
      }
    });
    setImages(reOrderedImage);
    // const reOrderedPlaylist = playlist.map((song) => {
    //   if (song.id === parseInt(result.draggableId)) {
    //     song.position = result.destination.index;
    //     // console.log("CONDITION 1", song);
    //     return song;
    //   } else if (affectedRange.includes(song.position)) {
    //     if (directionOfDrag === "GREATER") {
    //       song.position = song.position - 1;
    //       // console.log("CONDITION 2.1", song);
    //       return song;
    //     } else if (directionOfDrag === "LESS") {
    //       song.position = song.position + 1;
    //       // console.log("CONDITION 2.2", song);
    //       return song;
    //     }
    //   } else {
    //     // console.log("CONDITION 3", song);
    //     return song;
    //   }
    // });
    // setImages(reOrderedPlaylist);
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
