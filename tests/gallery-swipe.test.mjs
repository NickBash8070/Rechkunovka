import test from 'node:test';
import assert from 'node:assert/strict';
import {gallerySwipeStep} from '../src/components/gallery-swipe.js';

test('horizontal swipes navigate once in the corresponding direction',()=>{
 assert.equal(gallerySwipeStep(-80,10),1);
 assert.equal(gallerySwipeStep(80,-10),-1);
 assert.equal(gallerySwipeStep(-48,0),1);
});
test('taps, short movements and vertical or diagonal gestures do not navigate',()=>{
 for(const [dx,dy] of [[0,0],[20,0],[-47,0],[10,100],[-80,80],[70,50]]){
  assert.equal(gallerySwipeStep(dx,dy),0);
 }
});
