import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import galleryData from '../data';

import { orderBy } from 'lodash';

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
    console.log('RESULT', destination, source);
    // if (
    //   destination.droppableId === source.droppableId &&
    //   destination.index === source.index
    // ) {
    //   return;
    // }
    // const directionOfDrag =
    //   destination.index > source.index ? "GREATER" : "LESS";
    // let affectedRange: any[];
    // if (directionOfDrag === "GREATER") {
    //   affectedRange = range(source.index, destination.index + 1);
    // } else if (directionOfDrag === "LESS") {
    //   affectedRange = range(destination.index, source.index);
    // }
    // // console.log("AFFECTED RANGE", affectedRange);
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
