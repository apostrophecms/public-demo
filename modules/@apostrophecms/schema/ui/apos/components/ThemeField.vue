<template>
  <AposInputWrapper
    :field="field"
    :error="effectiveError"
    :uid="uid"
    :modifiers="modifiers"
    :display-options="displayOptions"
  >
    <template #body>
      <div class="wrapper">
        <div class="themes">
          <div
            v-for="theme in themes"
            class="theme"
            :class="[
              theme.name,
              { selected: currentValue === theme.name }
            ]"
            @click="select(theme.name)"
            >
            <div class="type-sample" :style="`font-family: ${theme.fonts.headline}`">
              Aa
            </div>
            <div class="colors-sample">
              <div class="color-sample" :style="`background-color: ${theme.colors.one}`" />
              <div class="color-sample" :style="`background-color: ${theme.colors.two}`" />
              <div class="color-sample" :style="`background-color: ${theme.colors.three}`" />
              <div class="color-sample" :style="`background-color: ${theme.colors.four}`" />
              <div class="color-sample" :style="`background-color: ${theme.colors.five}`" />
            </div>
            <div class="button-sample">
              <button class="button">
                <span>Read More</span>
                <svg viewBox="0 0 24 24"><g style="display: inline; fill: rgb(15, 20, 25);"><path d="M12.957 4.54L20.414 12l-7.457 7.46-1.414-1.42L16.586 13H3v-2h13.586l-5.043-5.04 1.414-1.42z" style="border-width: 0px; display: inline; fill: rgb(15, 20, 25); text-decoration: none solid rgb(15, 20, 25);"></path></g></svg>
              </button>
            </div>
          </div>
        </div>
        <div
          class="preview"
          :class="currentValue"
          :style="`background-color: ${themes[currentValue].colors.one}`"
        >
          <div
            class="t-meta"
            style="margin-bottom: 25px; letter-spacing: 1px;"
            :style="`font-family: ${themes[currentValue].fonts.meta}`"
          >
            Philadelphia, PA, 10:24am
          </div>
          <div
            class="t-headline"
            :style="`font-family: ${themes[currentValue].fonts.headline}`"
          >
            Bigger, <strong>bolder</strong>, and <em>better</em>.
          </div>
          <p
            class="t-body"
            :style="`font-family: ${themes[currentValue].fonts.body}`"
          >
            A growth is a sentence from the right perspective. Authors often misinterpret the port as a grasping spandex, when in actuality it feels more like a carping share.
          </p>
          <!-- <div class="card a">
            <div class="pill">
              <div class="t-meta" :style="`font-family: ${themes[currentValue].fonts.meta}`">Head's up</div>
            </div>
              <div class="t-headline" :style="`font-family: ${themes[currentValue].fonts.headline}`">You are approaching an overage</div>
              <div class="bars">
                <div class="text">
                  <span class="t-meta" :style="`font-family: ${themes[currentValue].fonts.meta}`">Current Usage: kW/hrs</span>
                  <span class="t-meta" :style="`font-family: ${themes[currentValue].fonts.meta}`">Limit: 300</span>
                </div>
                <div class="boxes">
                  <div class="box a" :style="`background-color:${themes[currentValue].colors.one}`" />
                  <div class="box b" :style="`background-color:${themes[currentValue].colors.three}`" />
                  <div class="box c" :style="`background-color:${themes[currentValue].colors.five}`"/>
                </div>
              </div>
            </div> -->
          </div>
        </div>

      <!-- <AposSelect
        :icon="icon"
        :choices="choices"
        :classes="classes"
        :disabled="field.readOnly"
        :selected="modelValue.data"
        :autocomplete="field.autocomplete"
        @change="change"
      /> -->
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputSelectLogic from '../logic/AposInputSelect';
export default {
  name: 'ThemeField',
  mixins: [ AposInputSelectLogic ],
  data() {
    return {
      currentValue: 'one',
      themes: {
        one: {
          name: 'one',
          fonts: {
            meta: "'Consolas', 'Monaco', monospace;'",
            headline: "'Optima', 'Segoe', 'Segoe UI', 'Candara', 'Calibri', 'Arial', sans-serif;",
            body: "tahoma, geneva, verdana, kalimati, sans-serif;"
          },
          colors: {
            one: '#FFFFFF',
            two: '#F5F5F5',
            three: '#D9D9D9',
            four: '#797979',
            five: '#000000',
          }
        },
        two: {
          name: 'two',
          fonts: {
            meta: "'Dejavu Sans', 'Arial', 'Verdana', sans-serif'",
            headline: "'Rockwell', 'Courier Bold', 'Courier', 'Georgia', 'Times'",
            body: "'Georgia', 'Times', 'Times New Roman', serif;"
          },
          colors: {
            one: '#FFFFFF',
            two: '#E1DFD9',
            three: '#209D50',
            four: '#1D231C',
            five: '#000000',
          }
        },
        three: {
          name: 'three',
          fonts: {
            meta: '"courier new", courier, andale mono, "free mono", monospace;',
            headline: "'Gill Sans', 'Gill Sans MT', 'Calibri', sans-serif",
            body: "Lucida Sans', 'Helvetica', 'Arial', sans-serif"
          },
          colors: {
            one: '#FCF0F0',
            two: '#D1C8F4',
            three: '#AE9DEF',
            four: '#9B2929',
            five: '#531A4A',
          }
        },
        four: {
          name: 'four',
          fonts: {
            meta: "'Gill Sans', 'Gill Sans MT', 'Calibri', sans-serif",
            headline: "'Didot', 'Didot LT STD', 'Hoefler Text', 'Garamond', 'Calisto MT', 'Times New Roman', serif",
            body: "'Goudy Old Style', 'Garamond', 'Big Caslon', 'Times New Roman', serif;"
          },
          colors: {
            one: '#EAE6DD',
            two: '#EED286',
            three: '#7CB4B2',
            four: '#34659B',
            five: '#2D2D2A',
          }
        }
      },
      metaSample: 'Some small text',
      bodySample: 'A growth is a sentence from the right perspective. Authors often misinterpret the port as a grasping spandex, when in actuality it feels more like a carping share.',
    };
  },
  methods: {
    select(theme) {
      this.currentValue = theme;
    }
  }
};
</script>

<style>
.apos-field__wrapper--theme {
  max-width: none !important;
}
.apos-modal__rail.apos-modal__rail--right {
  display: none;
}
.apos-modal__main--with-rails {
  grid-template-columns: 15% 1fr !important;
}
</style>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    gap: 20px;
    width: 100%;
  }

  .theme {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid var(--a-base-6);
    padding: 20px;
    border-radius: 8px;

    &.selected {
      border-color: var(--a-primary);
      background-color: var(--a-primary-transparent-25);
    }

    &:hover:not(.selected) {
      cursor: pointer;
      background-color: var(--a-base-9);
      border-color: var(--a-primary-transparent-25);
    }

  }

  .type-sample {
    font-size: 52px;
  }

  .button-sample {
    .button {
      font-size: 15px;
      padding: 8px 20px;
      align-items: center;
      border-width: 0px;
      box-sizing: border-box;
      color: rgb(15, 20, 25);
      display: flex;
      // font-family: TwitterChirp, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 14px;
      font-weight: 700;
      line-height: 16px;
      text-decoration: none solid rgb(15, 20, 25);
      unicode-bidi: isolate;
      white-space-collapse: preserve;
      width: 100%;
      white-space: nowrap;
    }
    svg {
      border-width: 0px;
    color: rgb(15, 20, 25);
    display: block;
    fill: rgb(15, 20, 25);
    flex-shrink: 0;
    height: 18.75px;
    overflow-clip-margin: content-box;
    overflow: hidden;
    position: relative;
    text-decoration: none solid rgb(15, 20, 25);
    vertical-align: text-bottom;
    padding-left: 8px;
    }
  }

  .colors-sample {
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(auto-fit,  minmax(10px, max-content)) ;
    max-width: 50%;
  }

  .color-sample {
    height: 90px;
    width: 70px;
    border-radius: 4px;
    border: 1px solid #cccccc2d;
  }

  .themes {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 40%;
  }

 .colors {
    display: flex;
  }

  .color {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 30px;
  }

  .card {
    background-color: white;
    border-radius: 16px;
    padding: 20px;

    &.a {
      .t-headline {
        font-weight: 600;
        letter-spacing: -1.5px;
        margin-bottom: 20px;
      }

      .text {
        display: flex;
        justify-content: space-between;
      }

      .boxes {
        display: flex;
        background-color: var(--a-base-8);
        border-radius: 16px;
        padding: 5px;
        gap: 5px;
      }

      .box {
        height: 60px;
        &.a { width: 20%; }
        &.b { width: 40%; }
        &.c { width: 30%; }
      }
    }
  }

  .pill {
    display: inline-block;
    margin-bottom: 20px;
    border-width: 1px;
    border-style: solid;
    padding: 5px 8px;
    border-radius: 20px;
  }

  .preview {
    width: 60%;
    background-color: var(--a-base-10);
    border-radius: 16px;
    padding: 50px 30px;
    border: 1px solid #ededed;

    .t-meta {
      font-size: 14px;
    }
    .t-headline {
      font-size: 72px;
    }
    .t-body {
      font-size: 22px;
      line-height: 1.2;
      margin-top: 10px;
    }
  }

 

</style>
