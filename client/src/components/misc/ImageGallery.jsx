import { useParams } from "react-router-dom";
import { useState, useCallback } from "react";
import Gallery from "react-photo-gallery"
import Carousel, { ModalGateway, Modal } from 'react-images'

export default function ImageGallery({ photos }) {
    //state
    const [current, setCurrent] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    //hooks
    const params = useParams()


    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrent(index)
        setIsOpen(true)
    }, [])

    const closeLightbox = () => {
        setCurrent(0)
        setIsOpen(false)
    }

    return <>
        <Gallery photos={photos} onClick={openLightbox} />;

        <ModalGateway>
            {isOpen ? (
                <Modal onClose={closeLightbox}>
                    <Carousel
                        currentIndex={current}
                        views={photos.map((x) => ({
                            ...x,
                            srcset: x.scrset,
                            caption: x.title,
                        }))} />
                </Modal>
            ) : null}
        </ModalGateway>
    </>
}