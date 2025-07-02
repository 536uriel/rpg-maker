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



export function stopMoveWhenCollide(subject, obstacles, x, y, camera, canvas) {
    
 
    subject.pos.x += x
   
    

    //if subject move to right
    if (x > 0) {

        intersection(subject, obstacles, obstacle => {


            if (subject.rp > obstacle.lp) {
                
                subject.rp = obstacle.lp;
            }
        });
    } else if (x < 0) {
        intersection(subject, obstacles, obstacle => {
            if (subject.lp < obstacle.rp) {
                
                subject.lp = obstacle.rp;
            }
        });
    }


    subject.pos.y += y
    


    if (y > 0) {
        intersection(subject, obstacles, obstacle => {
            if (subject.bp > obstacle.tp) {
                
                subject.bp = obstacle.tp;
            }
        });
    } else if (y < 0) {
        intersection(subject, obstacles, obstacle => {
            if (subject.tp < obstacle.bp) {
                subject.tp = obstacle.bp;
            }
        });
    }

    camera.x = subject.pos.x - canvas.width / 2;
    camera.y = -(subject.pos.y - canvas.height / 2);
}



