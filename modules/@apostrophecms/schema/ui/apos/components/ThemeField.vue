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
            <div class="t-meta">{{ metaSample }}</div>
            <div class="t-headline">Theme {{ theme.name }}</div>
            <div class="t-body">{{ bodySample }}</div>
            <div class="colors">
              <div class="color primary"/>
              <div class="color secondary"/>
              <div class="color tertiary"/>
            </div>
          </div>
        </div>
        <div class="preview" :class="currentValue">
          <div class="t-meta" style="margin-bottom: 15px;">Some small text</div>
          <div class="t-headline">To be more specific, those winters are nothing more than edges.</div>
          <p class="t-body">A growth is a sentence from the right perspective. Authors often misinterpret the port as a grasping spandex, when in actuality it feels more like a carping share.</p>
          <div class="card a">
            <div class="pill">
              <div class="t-meta">Head's up</div>
            </div>
              <div class="t-headline">You are approaching an overage</div>
              <div class="bars">
                <div class="text">
                  <span class="t-meta">Current Usage: kW/hrs</span>
                  <span class="t-meta">Limit: 300</span>
                </div>
                <div class="boxes">
                  <div class="box a" :style="`background-color:${theme.colors.primary}`" />
                  <div class="box b bg-primary" />
                  <div class="box c bg-tertiary" />
                </div>
              </div>
            </div>
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
  name: 'AposInputSelect',
  mixins: [ AposInputSelectLogic ],
  data() {
    return {
      currentValue: 'one',
      themes: [
        {
          name: 'one',
          fonts: {
            meta: '"courier new", courier, andale mono, "free mono", monospace;',
            headline: "verdana, geneva, tahoma, kalimati, sans-serif;",
            body: "tahoma, geneva, verdana, kalimati, sans-serif;"
          },
          colors: {
            primary: '#C699FE',
            secondary: '#F8FE6E',
            tertiary: '#1A1A1A'
          }
        },
        {
          name: 'two',
          fonts: {
            meta: '"courier new", courier, andale mono, "free mono", monospace;',
            headline: "verdana, geneva, tahoma, kalimati, sans-serif;",
            body: "tahoma, geneva, verdana, kalimati, sans-serif;"
          },
          colors: {
            primary: '#FD6333',
            secondary: '#8C67F7',
            tertiary: '#2AA88F'
          }
        },
        {
          name: 'three',
          fonts: {
            meta: '"courier new", courier, andale mono, "free mono", monospace;',
            headline: "verdana, geneva, tahoma, kalimati, sans-serif;",
            body: "tahoma, geneva, verdana, kalimati, sans-serif;"
          },
          colors: {
            primary: '#6C42E0',
            secondary: '#FACC15',
            tertiary: '#4ADE80'
          }
        }
      ],
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
</style>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    gap: 20px;
    width: 100%;
  }

  .theme {
    display: flex;
    flex-direction: column;
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

  .t-meta {
    font-size: 12px;
  }

  .t-headline {
    font-size: 32px;
  }

  .t-body {
    font-size: 16px;
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
    // border: 1px solid var(--a-base-8);
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
    padding: 30px;

    // .one {
    //   .bg-primary { background-color: }
    // }

    // .t-meta {
    //   font-size: 14px;
    // }

    // .t-headline {
    //   font-size: 64px;
    // }

    // .t-body {
    //   font-size: 18px;
    // }
  }
  .one {
    .t-meta {
      font-family:"courier new", courier, andale mono, "free mono", monospace;
    }

    .t-headline {
      font-family:verdana, geneva, tahoma, kalimati, sans-serif;
    }

    .t-body {
      font-family: tahoma, geneva, verdana, kalimati, sans-serif;
    }


    .primary {
      background-color: #C699FE;
    }
    .secondary {
      background-color: #F8FE6E;
    }
    .tertiary {
      background-color: #1A1A1A;
    }
  }

  .two {
    .t-meta {
      font-family:georgia, "times new roman", norasi, serif;
    }

    .t-headline {
      font-family:impact, haettenschweiler, "arial narrow bold", sans-serif;
    }

    .t-body {
      font-family:arial, sans-serif;
    }
    .primary {
      background-color: #FD6333;
    }
    .secondary {
      background-color: #8C67F7;
    }
    .tertiary {
      background-color: #2AA88F;
    }
  }

  .three {
    .t-meta {
      font-family:"century gothic","avant garde",'apple gothic',sans-serif
    }

    .t-headline {
      font-family: consolas, monospace;
    }

    .t-body {
      font-family:georgia, "times new roman", norasi, serif;
    }
    .primary {
      background-color: #6C42E0;
    }
    .secondary {
      background-color: #FACC15;
    }
    .tertiary {
      background-color: #4ADE80;
    }
  }

 

</style>
