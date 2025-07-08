// checks overlapping objects
export function overlap(subject, rect) {
    return subject.bp > rect.t
        && subject.tp < rect.b
        && subject.rp > rect.l
        && subject.lp < rect.r;
}

/* Iterate over all obstables that overlap subject and execute the function. */
export function intersection(subject, obstacles, fn) {

    obstacles.filter(obstacle => {
        return overlap(subject, obstacle)
    }).forEach(fn);
}


export function stopMoveWhenCollide(subject, obstacles, x, y, camera, canvas, sprite) {


    subject.pos.x += x

    const water = sprite.sprites.get('water');


    //if subject move to right
    if (x > 0) {

        intersection(subject, obstacles, obstacle => {

            if (subject.rp > obstacle.lp) {
                //תקן לסוף השמאל
                if (obstacle.sprite != water) {
                    subject.rp = obstacle.lp;
                } 
            }



        });
    } else if (x < 0) {
        intersection(subject, obstacles, obstacle => {
            if (subject.lp < obstacle.rp) {
                //תקן לסוף הימין
                if (obstacle.sprite != water) {
                    subject.lp = obstacle.rp;
                }
            }

        });
    }


    subject.pos.y += y



    if (y > 0) {
        intersection(subject, obstacles, obstacle => {
            if (subject.bp > obstacle.tp) {
                //תקן לסוף הלמעלה
                if (obstacle.sprite != water) {
                    subject.bp = obstacle.tp;
                    subject.jump = false;
                }
            }

        });
    } else if (y < 0) {
        intersection(subject, obstacles, obstacle => {
            if (subject.tp < obstacle.bp) {
                //תקן לסוף הלמטה
                if (obstacle.sprite != water) {
                    subject.tp = obstacle.bp;
                }
            }

        });
    }

    camera.x = subject.pos.x - canvas.width / 2;
    camera.y = -(subject.pos.y - canvas.height / 2);
}



